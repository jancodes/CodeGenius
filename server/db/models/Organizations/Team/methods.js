'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Question methods */
module.exports = {
  class: function(db){
    return {
      addAssociations
    };
  },
  instance: function(db){
    return {};
  }
}

function addAssociations(db){
  const Team = db.models['team'];
  const Organization = db.models['organization'];
  const User = db.models['user'];
  const UserTeam = db.models['userTeam'];

  Team.belongsTo(Organization);
  Team.belongsToMany(User, {as: 'students', through: UserTeam, otherKey: 'userId'})
  Team.belongsToMany(User, {as: 'instructors', through: UserTeam, otherKey: 'userId'});
  Team.belongsTo(User, {as: 'creator', foreignKey: 'creatorId', targetKey: 'id'});
}
