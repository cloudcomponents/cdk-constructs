#!/bin/bash

set -ex

git config --global credential.helper '!aws codecommit credential-helper $@'
git config --global credential.UseHttpPath true

declare -a repos

if [ -z ${REPOSITORY_NAMES} ]; then
    repos=(`aws codecommit list-repositories --query 'repositories[].repositoryName' --output text --region $AWS_DEFAULT_REGION`)
else
    repos="${REPOSITORY_NAMES}"
fi 

for codecommitrepo in "${repos[@]}"; do  
    echo "[===== Backup repository: ${codecommitrepo} =====]"

    git clone "https://git-codecommit.${AWS_DEFAULT_REGION}.amazonaws.com/v1/repos/${codecommitrepo}"

    dt=$(date -u '+%Y_%m_%d_%H_%M')
    zipfile="${codecommitrepo}_backup_${dt}_UTC.tar.gz"
    
    echo "Compressing repository: ${codecommitrepo} into file: ${zipfile} and uploading to S3 bucket: ${BACKUP_BUCKET}/${codecommitrepo}"

    tar -zcvf "${zipfile}" "${codecommitrepo}/"
    
    aws s3 cp "${zipfile}" "s3://${BACKUP_BUCKET}/${codecommitrepo}/${zipfile}"

    rm $zipfile
    rm -rf "$codecommitrepo"
done