def githubRepoURL = "https://github.com/Enja-Anderson/ComITFinalProject.git" // Replace with your GitHub repository URL
def dockerFile = "DockerBuildFile.txt" // Replace with your Dockerfile name
def s3BucketName = "comit-finalproject" // Replace with your S3 bucket name
def s3ObjectKey = "dockerimage" // Replace with your desired image name

pipeline {
    agent any

    stages {
        stage('Clone GitHub Repository') {
            steps {
                // Clone the GitHub repository into the Jenkins workspace
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: githubRepoURL]]])
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image in the Jenkins workspace
                sh "docker build -t dockerimage -f ${dockerFile} ."
                
                // Display the archived file path
                echo "Archived Docker image path: ${BUILD_TAG}/dockerimage"
            }
        }
        
        stage('Display Current Directory') {
            steps {
                script {
                    def currentDirectory = pwd()
                    echo "Current working directory is: ${currentDirectory}"
                }
            }
        }
        
        stage('Debug') {
            steps {
                sh 'ls'
            }
        }

        stage('Push Docker Image to S3') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                script {
                    // Define the path to the archived Docker image using the BUILD_TAG
                    def archivedDockerImagePath = "/var/lib/jenkins/workspace/Build/target"
                    // Update the awsS3Params with the path to the archived Docker image
                    def awsS3Params = [
                        file: archivedDockerImagePath,   // Use the path to the archived Docker image
                        bucket: 'comit-finalproject',    // Your S3 bucket name
                        path: 'images/',                 // Destination path in the S3 bucket
                    ]
    
                    // Use the s3Upload step to upload the Docker image to S3
                    s3Upload(awsS3Params)
                }
            }
        }
    }

    post {
        failure {
            echo "Build failed. Skipping Docker image push."
        }
    }
}
