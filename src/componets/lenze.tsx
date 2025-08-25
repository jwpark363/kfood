import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Search, X, Loader, Eye, Zap } from 'lucide-react';
import styled from 'styled-components';

// Styled Components (CSS-in-JS approach using inline styles for Claude compatibility)
const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`
const Header = styled.div`
    text-align: center;
    margin-bottom: 30px;
`

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: #1a73e8;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const Subtitle = ({ children }: any) => (
  <p style={{
    color: '#5f6368',
    fontSize: '1rem'
  }}>
    {children}
  </p>
);

const UploadArea = ({ isDragOver, children, ...props }: any) => (
  <div style={{
    border: `2px dashed ${isDragOver ? '#1a73e8' : '#dadce0'}`,
    borderRadius: '12px',
    padding: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: isDragOver ? '#f8f9fa' : '#fff',
    marginBottom: '20px'
  }} {...props}>
    {children}
  </div>
);

const ImagePreview = ({ children }: any) => (
  <div style={{
    position: 'relative',
    marginBottom: '20px'
  }}>
    {children}
  </div>
);

const PreviewImage = ({ src, alt }: any) => (
  <img
    src={src}
    alt={alt}
    style={{
      width: '100%',
      maxHeight: '400px',
      objectFit: 'contain',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}
  />
);

const CloseButton = ({ onClick }: any) => (
  <button
    onClick={onClick}
    style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(0,0,0,0.6)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }}
  >
    <X size={16} />
  </button>
);

const Button = ({ primary, children, disabled, ...props }: any) => (
  <button
    style={{
      backgroundColor: primary ? '#1a73e8' : '#f8f9fa',
      color: primary ? 'white' : '#3c4043',
      border: primary ? 'none' : '1px solid #dadce0',
      borderRadius: '24px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
      marginRight: '10px'
    }}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

const ResultsContainer = ({ children }: any) => (
  <div style={{
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '20px'
  }}>
    {children}
  </div>
);

const ResultItem = ({ children }: any) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e8eaed'
  }}>
    {children}
  </div>
);

interface AnalysisResult {
  type: 'text' | 'object' | 'landmark' | 'product';
  confidence: number;
  description: string;
  details?: string;
}

const GoogleLensComponent: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock analysis function (실제 구현에서는 AI API 호출)
  const analyzeImage = useCallback(async (): Promise<AnalysisResult[]> => {
    // 실제로는 Google Vision API나 다른 이미지 분석 서비스를 호출
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            type: 'object',
            confidence: 0.95,
            description: '고양이',
            details: '털이 긴 갈색 고양이가 앉아있는 모습'
          },
          {
            type: 'text',
            confidence: 0.87,
            description: '텍스트 감지됨',
            details: '이미지에서 여러 텍스트 요소가 발견되었습니다'
          },
          {
            type: 'product',
            confidence: 0.82,
            description: '유사한 제품',
            details: '온라인에서 유사한 제품을 찾았습니다'
          }
        ]);
      }, 2000);
    });
  }, []);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResults([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    try {
      const analysisResults = await analyzeImage();
      setResults(analysisResults);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setResults([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'text': return <Search size={16} />;
      case 'object': return <Eye size={16} />;
      case 'landmark': return <Camera size={16} />;
      case 'product': return <Zap size={16} />;
      default: return <Search size={16} />;
    }
  };

  return (
    <Container>
      <Header>
        <Title>
          <Camera size={32} />
          Google Lens
        </Title>
        <Subtitle>이미지를 업로드하여 객체, 텍스트, 장소 등을 인식해보세요</Subtitle>
      </Header>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {!selectedImage ? (
        <UploadArea
          isDragOver={isDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <Camera size={48} color="#1a73e8" style={{ marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px', color: '#3c4043' }}>이미지를 드래그하거나 클릭하여 업로드</h3>
          <p style={{ color: '#5f6368' }}>JPG, PNG, GIF 형식을 지원합니다</p>
        </UploadArea>
      ) : (
        <>
          <ImagePreview>
            <PreviewImage src={selectedImage} alt="Selected image" />
            <CloseButton onClick={handleRemoveImage} />
          </ImagePreview>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Button primary onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  분석 중...
                </>
              ) : (
                <>
                  <Search size={16} />
                  이미지 분석
                </>
              )}
            </Button>
            <Button onClick={handleUploadClick}>
              <Upload size={16} />
              다른 이미지 선택
            </Button>
          </div>
        </>
      )}

      {results.length > 0 && (
        <ResultsContainer>
          <h3 style={{ marginBottom: '16px', color: '#3c4043' }}>분석 결과</h3>
          {results.map((result, index) => (
            <ResultItem key={index}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                {getResultIcon(result.type)}
                <strong style={{ marginLeft: '8px', color: '#1a73e8' }}>
                  {result.description}
                </strong>
                <span style={{
                  marginLeft: 'auto',
                  backgroundColor: result.confidence > 0.9 ? '#34a853' : '#fbbc04',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {Math.round(result.confidence * 100)}%
                </span>
              </div>
              {result.details && (
                <p style={{ color: '#5f6368', margin: 0 }}>{result.details}</p>
              )}
            </ResultItem>
          ))}
        </ResultsContainer>
      )}
    </Container>
  );
};

export default GoogleLensComponent;