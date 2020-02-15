import json
import boto3
import traceback
import re

print('Loading function')

ssm_client = boto3.client('ssm')
code_pipeline = boto3.client('codepipeline')


def lambda_handler(event, context):
    """The Lambda function handler

    Args:
        event: The event passed by Lambda
        context: The context passed by Lambda
    """
    # Extract the Job ID
    job_id = event['CodePipeline.job']['id']

    # Extract the Job Data
    job_data = event['CodePipeline.job']['data']

    # Extract the params
    params = get_user_params(job_data)

    try:
        parameter = ssm_client.get_parameter(
            Name=params['parameterName'],
            WithDecryption=False
        )

        if 'regExp' in params:
            result = re.search(
                params['regExp'], parameter['Parameter']['Value'])

            if not result:
                put_job_failure(job_id, 'Value does not match the regular expression:' +
                                params['regExp'])

        put_job_success(
            job_id, parameter if params['logParameter'] else 'Logging is off')

    except Exception as e:
        print('Function failed due to exception.')
        print(e)
        traceback.print_exc()
        put_job_failure(job_id, 'Function exception: ' + str(e))

    print('Function complete.')
    return "Complete."


def get_user_params(job_data):
    """Decodes the JSON user parameters and validates the required properties.

    Args:
        job_data: The job data structure containing the UserParameters string which should be a valid JSON structure

    Returns:
        The JSON parameters decoded as a dictionary.

    Raises:
        Exception: The JSON can't be decoded or a property is missing.

    """
    try:
        user_parameters = job_data['actionConfiguration']['configuration']['UserParameters']
        decoded_parameters = json.loads(user_parameters)

    except Exception:
        # We're expecting the user parameters to be encoded as JSON
        # so we can pass multiple values. If the JSON can't be decoded
        # then fail the job with a helpful message.
        raise Exception('UserParameters could not be decoded as JSON')

    if 'parameterName' not in decoded_parameters:
        raise Exception(
            'Your UserParameters JSON must include the parameter name')

    if 'logParameter' not in decoded_parameters:
        raise Exception(
            'Your UserParameters JSON must include logParameter')

    return decoded_parameters


def put_job_success(job, message):
    """Notify CodePipeline of a successful job

    Args:
        job: The CodePipeline job ID
        message: A message to be logged relating to the job status

    Raises:
        Exception: Any exception thrown by .put_job_success_result()

    """
    print('Putting job success')
    print(message)
    code_pipeline.put_job_success_result(jobId=job)


def put_job_failure(job, message):
    """Notify CodePipeline of a failed job

    Args:
        job: The CodePipeline job ID
        message: A message to be logged relating to the job status

    Raises:
        Exception: Any exception thrown by .put_job_failure_result()

    """
    print('Putting job failure')
    print(message)
    code_pipeline.put_job_failure_result(jobId=job, failureDetails={
                                         'message': message, 'type': 'JobFailed'})
