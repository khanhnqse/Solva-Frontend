import React, { useState } from 'react';
import {
  Button,
  message,
  Card,
  Typography,
  Row,
  Col,
  Progress,
  Steps,
  Collapse,
} from 'antd';
import {
  UploadOutlined,
  FilePdfOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import backgroundImage from '../../assets/Banner5.png';

const { Title, Paragraph } = Typography;
const { Step } = Steps;
const { Panel } = Collapse;

const InterviewAI = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [responseBody, setResponseBody] = useState(null);
  const [isHtmlResponse, setIsHtmlResponse] = useState(false);
  const [progress, setProgress] = useState(0);
  const { jwtToken } = useAuth();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      message.error('Please select a valid PDF file.');
    }
  };

  const handlePostFile = async () => {
    if (!file) {
      message.error('Please upload a PDF file.');
      return;
    }

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      const response = await axios.post(
        'https://jobeeapi.azurewebsites.net/api/Account/interview-with-ai',
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      message.success('PDF file uploaded successfully!');
      setResponseBody(response.data);

      setIsHtmlResponse(/<\/?[a-z][\s\S]*>/i.test(response.data));
    } catch (error) {
      message.error('Failed to upload PDF file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatResponseBody = (text) => {
    const formattedText = text
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\* \*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return formattedText;
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '30px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Row justify="center" style={{ marginTop: 20 }}>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Title style={{ color: 'white' }} level={2}>
              Simulated Interview
            </Title>
          </Col>
        </Row>
        <div
          style={{
            padding: '30px',
            maxWidth: '850px',
            margin: '0 auto',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Collapse className="mb-10">
            <Panel header="How to Use Jobee AI" key="1">
              <Steps direction="vertical" size="small" current={-1}>
                <Step
                  title="Select a PDF file"
                  description="Choose a gradeFile from your device by clicking the 'Choose File' button."
                  icon={<FilePdfOutlined />}
                />
                <Step
                  title="Ensure the file is valid"
                  description="Make sure the file is a valid PDF document."
                  icon={<CheckCircleOutlined />}
                />
                <Step
                  title="Upload the PDF"
                  description="Click the 'Upload PDF' button to submit the file."
                  icon={<UploadOutlined />}
                />
                <Step
                  title="Wait for analysis"
                  description="Wait for the file to be uploaded and analyzed by Jobee AI."
                  icon={loading ? <LoadingOutlined /> : <CheckCircleOutlined />}
                />
                <Step
                  title="View the results"
                  description="View the generated interview questions in the response section below."
                  icon={<CheckCircleOutlined />}
                />
              </Steps>
            </Panel>
          </Collapse>

          <h2>Upload PDF File</h2>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ marginBottom: '20px' }}
          />

          <div style={{ textAlign: 'center' }}>
            <Button
              style={{
                backgroundColor: '#3b7b7a',
                borderColor: '#3b7b7a',
                color: 'white',
              }}
              type="primary"
              onClick={handlePostFile}
              disabled={!file || loading}
            >
              {loading
                ? 'Please wait, Jobee is analyzing your CV'
                : 'Upload PDF'}
            </Button>
          </div>

          {loading && (
            <div style={{ marginTop: '20px' }}>
              <Progress percent={progress} />
            </div>
          )}
          {responseBody && (
            <div style={{ marginTop: '30px' }}>
              <Card title="Jobee AI" bordered={false}>
                <Typography>
                  <Title level={4}>This is the questions for you</Title>

                  {isHtmlResponse ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatResponseBody(responseBody),
                      }}
                    />
                  ) : (
                    <Paragraph>{responseBody}</Paragraph>
                  )}
                </Typography>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InterviewAI;
