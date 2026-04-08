// Tests that TCP socket connect() respects the DO output gate when
// TCP_SOCKET_CONNECT_OUTPUT_GATE is enabled.
//
// Invariant: by the time socket.opened resolves, any storage write started
// in the same turn must already be committed.

import { connect } from 'cloudflare:sockets';
import { strict as assert } from 'node:assert';
import { DurableObject } from 'cloudflare:workers';

export class SocketTestDO extends DurableObject {
  async fetch(request) {
    const port = new URL(request.url).searchParams.get('port');

    let putCompleted = false;

    // Storage write — no await. This creates a pending output gate lock.
    this.ctx.storage.put('key', 'value').then(() => {
      putCompleted = true;
    });

    // Connect immediately while the write may still be in-flight.
    const socket = connect(`localhost:${port}`);

    // socket.opened only resolves after handleProxyStatus confirms a successful
    // proxy status — which, with the autogate, cannot happen until
    // waitForOutputLocks() resolves, i.e. after the put is committed.
    await socket.opened;

    assert.ok(putCompleted, 'storage put must complete before socket opens');

    await socket.close();
    return new Response('ok');
  }
}

export const connectRespectsOutputGate = {
  async test(ctrl, env) {
    const id = env.SOCKET_TEST_DO.newUniqueId();
    const stub = env.SOCKET_TEST_DO.get(id);
    const resp = await stub.fetch(`http://do/?port=${env.ECHO_SERVER_PORT}`);
    assert.equal(resp.status, 200);
  },
};
