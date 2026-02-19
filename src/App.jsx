import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Cpu, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Mail, 
  ArrowRight,
  Terminal,
  Laptop,
  ArrowLeft,
  Check
} from 'lucide-react';

const App = () => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'digital' | 'sw' | 'ai'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const emailAddress = "sunny.ableedu@gmail.com";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0); // 페이지 변경 시 스크롤 상단 이동
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 이메일 전송 핸들러 (mailto 방식 보강)
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`[에이블에듀 문의] ${formData.name}님의 상담 신청`);
    const body = encodeURIComponent(
      `이름/기업명: ${formData.name}\n` +
      `회신받을 이메일: ${formData.email}\n\n` +
      `문의 내용:\n${formData.message}`
    );
    
    // mailto 링크 생성
    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    
    // 새 창에서 열거나 현재 창에서 실행 (브라우저 차단 방지)
    window.location.assign(mailtoLink);
  };

  const navLinks = [
    { name: '홈', href: '#home' },
    { name: '에이블에듀 소개', href: '#about' },
    { name: '커리큘럼', href: '#programs' },
    { name: '교육 성과', href: '#stats' },
    { name: '문의하기', href: '#contact' },
  ];

  // 커리큘럼 데이터
  const curriculumDetails = {
    digital: {
      title: '디지털 리터러시 & 기초',
      icon: <Laptop className="w-16 h-16 text-blue-600" />,
      tag: 'Digital Literacy',
      desc: '모든 연령층을 위한 디지털 시대의 필수 소양 교육',
      details: [
        '운영체제 및 기본 소프트웨어 활용 능력 향상',
        '인터넷 보안 및 디지털 에티켓 교육',
        '클라우드 서비스(Google Workspace, Notion) 협업 도구 마스터',
        '데이터 검색 및 정보 선별 능력 배양'
      ],
      target: '디지털 기기 활용이 낯선 시니어, 기초부터 다지고 싶은 성인'
    },
    sw: {
      title: 'SW 개발 & 프로그래밍',
      icon: <Code2 className="w-16 h-16 text-indigo-600" />,
      tag: 'Software Engineering',
      desc: '실무에 바로 투입 가능한 수준의 프로그래밍 역량 강화',
      details: [
        'Python, Javascript 등 현대 프로그래밍 언어 기초 및 심화',
        '웹 프론트엔드/백엔드 개발 프로세스 이해',
        'Git/GitHub를 활용한 형상 관리 및 팀 프로젝트',
        '알고리즘 및 자료구조 문제 해결 전략'
      ],
      target: '비전공자 대학생, 커리어 전환을 꿈꾸는 취업 준비생'
    },
    ai: {
      title: 'AI 인공지능 실무 활용',
      icon: <Cpu className="w-16 h-16 text-purple-600" />,
      tag: 'AI Practical Application',
      desc: '인공지능 도구를 통한 업무 및 학습 효율의 극대화',
      details: [
        'ChatGPT, Claude 등 생성형 AI를 활용한 프롬프트 엔지니어링',
        '이미지 및 영상 생성 AI 도구 실무 활용법',
        '데이터 분석 및 시각화를 위한 AI 모델 활용',
        '기업 업무 자동화(RPA)와 AI 결합 전략'
      ],
      target: '업무 효율을 높이고 싶은 직장인, AI 시대에 앞서가고 싶은 성인'
    }
  };

  // 부드러운 스크롤 이동 도우미
  const goToSection = (href) => {
    setCurrentPage('home');
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // 네비게이션 바 높이 고려
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // 상세 페이지 렌더링
  const renderDetailView = (type) => {
    const data = curriculumDetails[type];
    return (
      <div className="pt-32 pb-20 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center text-blue-600 font-bold mb-8 hover:translate-x-1 transition-transform"
          >
            <ArrowLeft className="mr-2" size={20} /> 홈으로 돌아가기
          </button>
          
          <div className="bg-blue-50 rounded-[40px] p-8 md:p-12 mb-12 flex flex-col items-center text-center">
            <div className="bg-white p-6 rounded-3xl shadow-sm mb-6">
              {data.icon}
            </div>
            <span className="text-blue-600 font-bold tracking-widest uppercase mb-2">{data.tag}</span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">{data.title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl">{data.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                주요 교육 내용
              </h2>
              <ul className="space-y-4">
                {data.details.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <Check className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                추천 대상
              </h2>
              <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <p className="text-indigo-900 font-medium text-lg leading-relaxed">
                  "{data.target}"
                </p>
              </div>
              <button 
                onClick={() => goToSection('#contact')}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                상담 신청하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (currentPage !== 'home') {
    return (
      <>
        <nav className="fixed w-full z-50 bg-white shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="cursor-pointer flex items-center" onClick={() => setCurrentPage('home')}>
              <span className="text-2xl font-bold text-blue-600">ABLE EDU</span>
              <span className="ml-1 text-sm font-medium text-gray-500">에이블에듀</span>
            </div>
            <button onClick={() => setCurrentPage('home')} className="text-gray-600 font-medium hover:text-blue-600">홈으로</button>
          </div>
        </nav>
        {renderDetailView(currentPage)}
        <Footer email={emailAddress} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
              <span className="text-2xl font-bold text-blue-600">ABLE EDU</span>
              <span className={`ml-1 text-sm font-medium ${scrolled ? 'text-gray-500' : 'text-blue-800'}`}>에이블에듀</span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => goToSection(link.href)}
                  className={`font-medium transition-colors hover:text-blue-600 ${scrolled ? 'text-gray-600' : 'text-gray-800'}`}
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => goToSection('#contact')}
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                교육 신청
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-blue-50 rounded-bl-[100px] hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold">
                <Terminal size={16} />
                <span>미래 디지털 역량 교육의 중심</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                디지털과 AI로 <br />
                <span className="text-blue-600">새로운 커리어</span>를 <br />
                디자인합니다.
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                에이블에듀는 초급자부터 전문가까지, 모든 세대를 위한 디지털 리터러시와 인공지능 교육을 통해 내일의 경쟁력을 만듭니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => goToSection('#programs')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 flex items-center justify-center gap-2 group transition-all"
                >
                  커리큘럼 보기
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button 
                  onClick={() => goToSection('#contact')}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center"
                >
                  기업 교육 문의
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] bg-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200" 
                    alt="Digital Education" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wider text-sm">Our Focus</h2>
          <p className="text-3xl font-bold text-gray-900 sm:text-4xl">에이블에듀가 집중하는 가치</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {[
            { title: '실전 중심 커리큘럼', desc: '이론을 넘어 현업에서 즉시 활용 가능한 SW/AI 스킬을 교육합니다.', icon: <Code2 /> },
            { title: '맞춤형 학습 경로', desc: '대학생, 직장인, 시니어 등 수강생의 레벨에 최적화된 로드맵을 제공합니다.', icon: <Terminal /> },
            { title: '미래 기술 교육', desc: '빠르게 변화하는 테크 트렌드를 반영하여 최신 AI 도구 활용법을 전수합니다.', icon: <Cpu /> }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="bg-blue-100 text-blue-600 w-14 h-14 flex items-center justify-center rounded-xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {React.cloneElement(item.icon, { size: 28 })}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">디지털 전문 커리큘럼</h2>
            <p className="text-gray-600 text-lg">기초 리터러시부터 고도화된 AI 개발까지 에이블에듀가 책임집니다.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <ProgramCard 
              title="디지털 리터러시 & 기초" 
              desc="전 연령을 대상으로 디지털 도구 활용법과 기초 소양을 교육합니다."
              icon={<Laptop className="w-8 h-8 text-blue-600" />}
              color="bg-blue-50"
              onClick={() => setCurrentPage('digital')}
            />
            <ProgramCard 
              title="SW 개발 & 프로그래밍" 
              desc="대학생 및 취업 준비생을 위한 실무 중심의 코딩 및 프로그래밍 과정입니다."
              icon={<Code2 className="w-8 h-8 text-indigo-600" />}
              color="bg-indigo-50"
              onClick={() => setCurrentPage('sw')}
            />
            <ProgramCard 
              title="AI 인공지능 실무 활용" 
              desc="생성형 AI부터 데이터 분석까지, 성인을 위한 맞춤형 AI 교육을 제공합니다."
              icon={<Cpu className="w-8 h-8 text-purple-600" />}
              color="bg-purple-50"
              onClick={() => setCurrentPage('ai')}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-blue-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10">
          <Cpu size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="grid md:grid-cols-4 gap-12">
            <div><p className="text-5xl font-extrabold mb-2">3,000+</p><p className="text-blue-100 font-medium">누적 수료생</p></div>
            <div><p className="text-5xl font-extrabold mb-2">97%</p><p className="text-blue-100 font-medium">실무 활용 만족도</p></div>
            <div><p className="text-5xl font-extrabold mb-2">50개</p><p className="text-blue-100 font-medium">파트너사 협업</p></div>
            <div><p className="text-5xl font-extrabold mb-2">24시간</p><p className="text-blue-100 font-medium">커뮤니티 지원</p></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-20 text-white space-y-8">
              <h2 className="text-3xl font-bold">궁금한 점이 있으신가요?</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                에이블에듀의 교육 프로그램에 대해 궁금한 사항은 언제든지 이메일로 문의주세요. 신속하게 답변해 드립니다.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-blue-400">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">이메일 문의</p>
                  <a href={`mailto:${emailAddress}`} className="text-xl font-bold hover:text-blue-400 transition-colors">
                    {emailAddress}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 bg-white p-12 lg:p-20">
              <form className="space-y-6" onSubmit={handleEmailSubmit}>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">이름 / 기업명</label>
                  <input 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                    placeholder="성함 또는 단체명을 입력하세요" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">회신받을 이메일</label>
                  <input 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email" 
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                    placeholder="example@email.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">문의 내용</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4" 
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none" 
                    placeholder="교육 대상, 원하는 기간 등 구체적인 문의 내용을 남겨주세요"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98]">
                  이메일로 문의 보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer email={emailAddress} />
    </div>
  );
};

// Reusable Components
const ProgramCard = ({ title, desc, icon, color, onClick }) => (
  <div className="group relative bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-blue-300 transition-all hover:shadow-2xl flex flex-col">
    <div className={`${color} p-10 flex flex-col items-center text-center space-y-4 flex-grow`}>
      <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
      <button 
        onClick={onClick}
        className="mt-4 bg-white text-blue-600 border border-blue-100 px-6 py-2 rounded-lg font-bold shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center gap-1"
      >
        자세히 보기 <ChevronRight size={18} />
      </button>
    </div>
  </div>
);

const Footer = ({ email }) => (
  <footer className="bg-gray-50 border-t py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">ABLE EDU</span>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">이용약관</a>
          <a href="#" className="text-gray-900 font-bold hover:text-blue-600 transition-colors text-sm">개인정보처리방침</a>
        </div>
      </div>
      <div className="text-center md:text-left text-gray-500 text-sm space-y-2 border-t pt-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-700 mb-1">에이블에듀 | 대표: 박선영</p>
            <p>사업자등록번호: 123-45-67890</p>
          </div>
          <div className="md:text-right">
            <p className="font-medium text-blue-600 mb-1">문의: {email}</p>
            <p>© 2026 Able Edu. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default App;