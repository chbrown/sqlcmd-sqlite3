import * as assert from 'assert';
import 'mocha';

import {Connection} from '..';

const db = new Connection({filename: 'sqlcmd_database.sqlite'});

import {setup, teardown} from './examples/persons';

describe('persons example', () => {
  before(done => setup(db, done));
  after(done => teardown(db, done));

  it('should count 100 persons', () => {
    return db.Select('person')
    .add('COUNT (*) AS count')
    .executePromise()
    .then(rows => {
      assert.equal(rows[0].count, 100);
    });
  });

  it('should find person named Brown aged 32', () => {
    return db.Select('person')
    .whereEqual({name: 'Brown'})
    .executePromise()
    .then((rows) => {
      assert.equal(rows[0].age, 32);
    });
  });
});
