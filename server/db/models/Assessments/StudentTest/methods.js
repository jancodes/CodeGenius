'use strict';


/** StudentTest methods */
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
  const StudentTest = db.models['studentTest'];
  const Assessment = db.models['assessment'];
  const User = db.models['user'];


}
