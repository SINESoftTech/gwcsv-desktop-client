pipeline {

 agent any
 environment{
    GIT_COMMIT="${env.GIT_COMMIT}"
    registryCredential = 'dockerhub'
 }
 stages {
    stage('Test'){
        agent{
             docker{
                 image 'node:14.17.3-stretch-slim'
                 reuseNode true
             }
        }
        steps {
            echo "test"
            // sh 'npm install'
            // sh 'npm run ci'
        }
    }
    stage('Build'){
        when{
            anyOf{
                branch 'main'
                branch 'uat'
            }
        }
        
        // agent{
        //     dockerfile {
        //         reuseNode true
        //     }
        // }
        steps {
          script{
            // sh 'npm install && npm run electron-build'
            echo "build_${env.BUILD_NUMBER}"
            def now = new Date().format("yyyyMMdd", TimeZone.getTimeZone('UTC'))
            zip zipFile: "gscsv_desktop_test_${now}_${env.BUILD_NUMBER}.zip", archive: false , dir: 'src' 
          }
        }
    }
     stage('Upload'){
        when{
            anyOf{
                branch 'main'
                branch 'uat'
            }
        }
        agent any
        steps {
          script{
            def now = new Date().format("yyyyMMdd", TimeZone.getTimeZone('UTC'))
            def fileName="gscsv_desktop_test_${now}_${env.BUILD_NUMBER}.zip"
            sh 'mkdir -p test-git'
            sh "cd test-git && cp ./${fileName} ./"
            dir("test-git") {
                git branch: 'main', credentialsId: 'gitlab', url: 'https://gitlab.com/gwcsv/gscsv-desktop-client-release-file.git'
              
                withCredentials([usernamePassword(credentialsId: 'gitlab', usernameVariable: 'USER', passwordVariable: 'PASSWORD')]) {
                    script {
                       env.encodedPass=URLEncoder.encode(PASSWORD, "UTF-8")
                    }
                    sh "git remote set-url origin https://se112:${encodedPass}@gitlab.com/gwcsv/gscsv-desktop-client-release-file.git"
                    sh "git add ${fileName}"
                    sh "git commit -m ${fileName}"
                    sh "git push --set-upstream origin main"
                }
            }
          }
        }
    }
 }
}
