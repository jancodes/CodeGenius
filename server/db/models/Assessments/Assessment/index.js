'use strict';

/**
 *
 * Assessment Model
 *
 */

/** dependencies */
const definitions = require('./definitions')
const methods = require('./methods')
const db = require(global._dbPath);

module.exports = db.define('assessment',
  /** defined in ./definitions */
  definitions(db),
  {
    /** class and instance methods are defined in ./methods */
    classMethods: methods.class(db),
    instanceMethods: methods.instance(db)
  }
);