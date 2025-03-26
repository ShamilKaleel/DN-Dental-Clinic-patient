pipeline {
    agent any
    
    tools {
        nodejs 'Node.js 20.9.0'
    }
    
    environment {
        EC2_USER = 'ubuntu'
        EC2_HOST = credentials('ec2-host')
        APP_NAME = 'user-frontend'
        DEPLOY_PATH = '/var/www/html'  // Root path for user frontend
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                // For the main site we don't need to set a base path
                sh 'npm install'
                sh 'npm run build'
                sh 'ls -la' // List files to see what was created
                sh 'ls -la ./dist' // Explicitly list dist directory contents
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Use the dist directory directly
                    def buildDir = './dist'
                    
                    if (fileExists(buildDir)) {
                        echo "Found build directory: ${buildDir}"
                        
                        // Debug: Check build directory contents
                        sh "ls -la ${buildDir}"
                        
                        // Ensure the build directory exists and has files
                        if (fileExists("${buildDir}/index.html")) {
                            echo "Build directory contains index.html"
                        } else {
                            error "index.html is missing from build directory. Deployment aborted."
                        }
                        
                        sshagent(['ec2-ssh-key']) {
                            // Create a tar file of the build
                            echo "Creating tar archive from: ${buildDir}"
                            sh "tar -czf user-build.tar.gz -C ${buildDir} ."
                            
                            // Verify tar was created
                            sh "ls -la user-build.tar.gz"
                            
                            // Copy it to the EC2 instance
                            echo "Copying tar to EC2 instance"
                            sh "scp -o StrictHostKeyChecking=no user-build.tar.gz ${EC2_USER}@${EC2_HOST}:/tmp/"
                            
                            // Extract and deploy on EC2
                            echo "Extracting and deploying on EC2"
                            sh """
                                ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                                    # Be careful with rm -rf on the root web directory
                                    # We exclude the admin directory to preserve it
                                    sudo find ${DEPLOY_PATH}/ -mindepth 1 -not -path "${DEPLOY_PATH}/admin*" -delete
                                    sudo mkdir -p ${DEPLOY_PATH}
                                    sudo tar -xzf /tmp/user-build.tar.gz -C ${DEPLOY_PATH}/
                                    rm /tmp/user-build.tar.gz
                                    sudo systemctl reload nginx
                                '
                            """
                        }
                    } else {
                        error "Build directory not found. Check your build process."
                    }
                }
            }
        }
    }
    
    post {
        failure {
            echo 'The user frontend pipeline failed. Check the build logs for details.'
        }
        success {
            echo 'Successfully built and deployed the user frontend application.'
        }
    }
}