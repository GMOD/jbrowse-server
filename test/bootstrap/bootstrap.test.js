var sails = require('sails');
var shell = require('shelljs');


before(function(client, done) {
    console.log("Lifting SAILS...");
    
    console.log("Using DB test/data/localDb.db");
    if (shell.cp('test/data/localDiskDb.db','test/data/localDb.db').code !== 0) {
      shell.echo('error copying test database');
      shell.exit(1);
    }
    sails.lift({

        // configuration for testing purposes
        // If you want to use a different DB for testing, uncomment these and replace with your own DB info.
        connections: {
          // Replace the following with whatever suits you.
            localDb: {
              adapter: 'sails-disk',
              filePath: 'test/data/'
            },
            testMysql: {
              adapter   : 'sails-mysql',
              host      : 'localhost',
              port      : 3306,
              user      : 'mySQLUser',
              password  : 'MyAwesomePassword',
              database  : 'testDB'
            }
        },

        models: {
          connection: 'localDb',
          migrate: 'drop'
        },
        policies: {
            '*': true
        }
        
    }, function(err) {
        if (err) return done(err);
        // here you can load fixtures, etc.
        setTimeout(function() {
            done(err, sails);
        },2000);
    });
});

after(function(client,done) {
    console.log("Lowering SAILS...");
    sails.lower(function() {
        console.log("done lowering sails.");
            done();
            setTimeout(function() {
                process.exit(1);
            },2000);
    });
});


