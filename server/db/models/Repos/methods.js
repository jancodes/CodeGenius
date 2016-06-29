'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
// var Sequelize = require( 'sequelize' );

module.exports = {
  class: function ( db ) {
    return {
      generateSalt: function () {
        return crypto.randomBytes( 16 )
          .toString( 'base64' );
      },
      encryptPassword: function ( plainText, salt ) {
        var hash = crypto.createHash( 'sha1' );
        hash.update( plainText );
        hash.update( salt );
        return hash.digest( 'hex' );
      },
      addAssociations
    };
  },
  instance: function ( db ) {
    return {
      sanitize: function () {
        return _.omit( this.toJSON(), [ 'password', 'salt' ] );
      },
      correctPassword: function ( candidatePassword ) {
        return this.Model.encryptPassword( candidatePassword, this.salt ) === this.password;
      }
    };
  },
  hooks: function ( db ) {
    return {
      beforeValidate: function ( user ) {
        if ( user.changed( 'password' ) ) {
          user.salt = user.Model.generateSalt();
          user.password = user.Model.encryptPassword( user.password, user.salt );
        }
      }
    };
  }
};

function addAssociations( db ) {


  const User = db.models[ 'user' ];
  const Repo = db.models[ 'repo' ];
  const StudentTest = db.models[ 'studentTest' ];
  const Assessment = db.models[ 'assessment' ];

  Repo.belongsToMany( User, {through: StudentTest} );
  Repo.belongsToMany( Assessment, {through: StudentTest} );

}
