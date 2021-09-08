pipeline {

 agent any
 environment{
    GIT_COMMIT="${env.GIT_COMMIT}"
    registryCredential = 'dockerhub'
 }
 stages {
    stage('Build'){
      agent{
           docker{
               image 'node:14.17.3-stretch-slim'
               reuseNode true
           }
      }
      steps {

          sh 'npm install'
          sh 'npm run test'
      }
    }
 }
}
