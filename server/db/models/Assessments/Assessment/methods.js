'use strict';

var Sequelize = require( 'sequelize' );

/** Assessment methods */
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


function addAssociations( db ) {
  const Team = db.models[ 'team' ];
  const Organization = db.models[ 'organization' ];
  const User = db.models[ 'user' ];
  const UserTeam = db.models[ 'userTeam' ];
  const UserOrganization = db.models[ 'userOrganization' ];
  const Assessment = db.models[ 'assessment' ];
  const Question = db.models[ 'question' ];
  const StudentTest = db.models[ 'studentTest' ];
  const Repo = db.models[ 'repo' ];

  Assessment.belongsTo( User, {as: 'instructor'} );
  Assessment.belongsToMany( User, {through: StudentTest, as: 'student'});
  Assessment.belongsTo( Team );
  Assessment.belongsToMany( Repo, {through: StudentTest} )
  Assessment.hasMany( Question );
}
