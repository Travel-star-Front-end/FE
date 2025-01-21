import { useState, useEffect } from 'react';
import styled from 'styled-components';
import '@fontsource/do-hyeon';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import AgreeModal from "../../../components/auth/signup/agreeModal";
import AgreeData from "../../../utils/signup/agreeData";

const signUpSchema = z
  .object({
    userId: z.string().nonempty('아이디를 입력해주세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자리 이상이어야 합니다.')
      .refine(
        (val) => /[A-Z]/.test(val) && /[a-z]/.test(val),
        '비밀번호는 대소문자를 섞어서 입력해주세요.'
      ),
    confirmPassword: z.string().nonempty('비밀번호를 다시 확인해주세요.'),
    name: z.string().nonempty('이름을 입력해주세요.'),
    year: z.string().nonempty('년을 선택해주세요.'),
    month: z.string().nonempty('월을 선택해주세요.'),
    day: z.string().nonempty('일을 선택해주세요.'),
    phone1: z
      .string()
      .nonempty('전화번호 앞자리를 입력해주세요.')
      .regex(/^\d+$/, '전화번호에는 숫자만 입력해주세요.'),
    phone2: z
      .string()
      .nonempty('전화번호 중간 자리를 입력해주세요.')
      .regex(/^\d+$/, '전화번호에는 숫자만 입력해주세요.'),
    phone3: z
      .string()
      .nonempty('전화번호 마지막 자리를 입력해주세요.')
      .regex(/^\d+$/, '전화번호에는 숫자만 입력해주세요.'),
    emailUser: z.string().nonempty('이메일 아이디를 입력해주세요.'),
    emailDomain: z.string().nonempty('이메일 도메인을 선택해주세요.'),
    customDomain: z.string().optional(),
    terms1: z
      .enum(['agree', 'disagree'])
      .refine((val) => val === 'agree', { message: '* 필수입니다' }),
    terms2: z
      .enum(['agree', 'disagree'])
      .refine((val) => val === 'agree', { message: '* 필수입니다' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

const signUpFn = async (formData) => {
  const finalDomain =
    formData.emailDomain === 'custom'
      ? formData.customDomain
      : formData.emailDomain;

  const birthDate = `${formData.year}-${String(formData.month).padStart(2, '0')}-${String(formData.day).padStart(2, '0')}`;

  const phoneNumber = `${formData.phone1}-${formData.phone2}-${formData.phone3}`;

  const payload = {
    name: formData.name,
    username: formData.userId,
    email: `${formData.emailUser}@${finalDomain}`,
    phone: phoneNumber,
    address: {
      suite: birthDate,
    },
  };

  try {
    const response = await API.post('https://jsonplaceholder.typicode.com/users', payload);
    console.log('응답 데이터:', response.data);
    return response.data;
  } catch (error) {
    console.error('요청 실패:', error.response?.data || error.message);
    throw error;
  }
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      userId: '',
      password: '',
      confirmPassword: '',
      name: '',
      year: '',
      month: '',
      day: '',
      phone1: '',
      phone2: '',
      phone3: '',
      emailUser: '',
      emailDomain: '',
      customDomain: '',
      terms1: '',
      terms2: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: signUpFn,
    onSuccess: () => {
      window.location.href = '/signup/completed'; 
    },
    onError: (err) => {
      console.error(err);
      alert('회원가입에 실패했습니다.');
    },
  });
  

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = 1900; y <= currentYear; y++) {
    years.push(y);
  }

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const getDaysInMonth = (y, m) => {
    if (!y || !m) return [];

    const yearNum = Number(y);
    const monthNum = Number(m);

    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1; 
    const nowDay = now.getDate();

    if (yearNum > nowYear) {
      return [];
    }

    if (yearNum === nowYear) {
      if (monthNum > nowMonth) {
        return [];
      }
      if (monthNum === nowMonth) {
        return Array.from({ length: nowDay }, (_, i) => i + 1);
      }
      const lastDay = new Date(yearNum, monthNum, 0).getDate();
      return Array.from({ length: lastDay }, (_, i) => i + 1);
    }

    const lastDay = new Date(yearNum, monthNum, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) => i + 1);
  };

  const days = getDaysInMonth(watch('year'), watch('month'));

  const handleCheckId = () => {
    const userIdValue = watch('userId');
    if (!userIdValue) {
      alert('아이디를 입력해주세요.');
      return;
    }
    alert('중복확인에 성공하셨습니다. (예시)');
  };

  const onSubmit = (data) => {
    mutate(data);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [termsAgreement, setTermsAgreement] = useState({
    terms1: '',
    terms2: '',
  });

  const handleOpenModal = (id) => {
    const selectedAgreement = AgreeData.find((item) => item.id === id);
    setModalData(selectedAgreement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const handleAgreeChange = (agree, termsId) => {
    const fieldName = termsId === 1 ? 'terms1' : 'terms2';
    
    setValue(fieldName, agree ? 'agree' : 'disagree', {
      shouldValidate: true, 
    });

    setTermsAgreement((prev) => ({
      ...prev,
      [termsId]: agree,
    }));
  };
  
  useEffect(() => {
    // console.log('terms1:', watch('terms1'));
    // console.log('terms2:', watch('terms2'));
  }, [watch('terms1'), watch('terms2')]); 
  
  
  return (
    <Container>
      <InnerForm>
        <SignUpBox>
          <Logo>여행별</Logo>
          <Title>회원가입</Title>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>아이디</Label>
              <InputContainer>
                <InputWrapper>
                  <Input
                    type="text"
                    placeholder="아이디 입력"
                    {...register('userId')}
                  />
                  <CheckButton type="button" onClick={handleCheckId}>
                    중복확인
                  </CheckButton>
                </InputWrapper>
                {errors.userId && <ErrorText>{errors.userId.message}</ErrorText>}
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <Label>비밀번호</Label>
              <InputContainer>
                <Input
                  type="password"
                  placeholder="비밀번호 입력"
                  {...register('password')}
                />
                {errors.password && (
                  <ErrorText>{errors.password.message}</ErrorText>
                )}
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <Label>비밀번호 확인</Label>
              <InputContainer>
                <Input
                  type="password"
                  placeholder="비밀번호 재입력"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <ErrorText>{errors.confirmPassword.message}</ErrorText>
                )}
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <Label>이름</Label>
              <InputContainer>
                <Input
                  type="text"
                  placeholder="이름 입력"
                  {...register('name')}
                />
                {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <Label>생년월일</Label>
              <InputContainer>
                <DateInputGroup>
                  <Select {...register('year')}>
                    <option value="">년</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Select>
                  <Select {...register('month')}>
                    <option value="">월</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </Select>
                  <Select {...register('day')}>
                    <option value="">일</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </Select>
                </DateInputGroup>
                {(errors.year || errors.month || errors.day) && (
                  <ErrorText>
                    {errors.year?.message ||
                      errors.month?.message ||
                      errors.day?.message}
                  </ErrorText>
                )}
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <Label>전화번호</Label>
              <InputContainer>
                <PhoneInputGroup>
                  <PhoneInput
                    type="text"
                    placeholder="010"
                    {...register('phone1')}
                  />
                  <Dash>-</Dash>
                  <PhoneInput
                    type="text"
                    placeholder="0000"
                    {...register('phone2')}
                  />
                  <Dash>-</Dash>
                  <PhoneInput
                    type="text"
                    placeholder="0000"
                    {...register('phone3')}
                  />
                </PhoneInputGroup>
                {(errors.phone1 || errors.phone2 || errors.phone3) && (
                  <ErrorText>
                    {errors.phone1?.message ||
                      errors.phone2?.message ||
                      errors.phone3?.message}
                  </ErrorText>
                )}
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <Label>이메일</Label>
              <InputContainer>
                <EmailInputGroup>
                  <EmailInput
                    type="text"
                    placeholder="이메일 아이디"
                    {...register('emailUser')}
                  />
                  @
                  <EmailInput
                    type="text"
                    placeholder="도메인"
                    value={
                      watch('emailDomain') === 'custom'
                        ? watch('customDomain') ?? ''
                        : watch('emailDomain') ?? ''
                    }
                    onChange={(e) => {
                      if (watch('emailDomain') === 'custom') {
                        setValue('customDomain', e.target.value);
                      }
                    }}
                    disabled={watch('emailDomain') !== 'custom'}
                  />
                  <EmailSelect
                    {...register('emailDomain')}
                    onChange={(e) => {
                      setValue('emailDomain', e.target.value);
                      if (e.target.value !== 'custom') {
                        setValue('customDomain', '');
                      }
                    }}
                  >
                    <option value="">선택</option>
                    <option value="custom">직접 입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="daum.net">daum.net</option>
                  </EmailSelect>
                </EmailInputGroup>
                {(errors.emailUser || errors.emailDomain) && (
                  <ErrorText>
                    {errors.emailUser?.message || errors.emailDomain?.message}
                  </ErrorText>
                )}
              </InputContainer>
            </FormGroup>

            <AgreementSection>
              <AgreementTitle>약관동의</AgreementTitle>

              <AgreementRow>
                <AgreementText onClick={() => handleOpenModal(1)}>
                  홈페이지 이용 약관 동의
                  <DropdownIcon />
                  {errors.terms1 && (
                    <ErrorTextInline>{errors.terms1.message}</ErrorTextInline>
                  )}
                </AgreementText>
                <RadioGroup>
                  <RadioLabel>
                    <input type="radio" value="agree" {...register('terms1')} checked={termsAgreement[1] === true} onChange={() => handleAgreeChange(true, 1)}/>
                    동의
                  </RadioLabel>
                  <RadioLabel>
                    <input
                      type="radio"
                      value="disagree"
                      {...register('terms1')}
                      checked={termsAgreement[1] === false}
                      onChange={() => handleAgreeChange(false, 1)}
                    />
                    비동의
                  </RadioLabel>
                </RadioGroup>
              </AgreementRow>

              <AgreementRow>
                <AgreementText onClick={() => handleOpenModal(2)}>
                  개인정보 수집 및 이용
                  <DropdownIcon />
                  {errors.terms2 && (
                    <ErrorTextInline>{errors.terms2.message}</ErrorTextInline>
                  )}
                </AgreementText>
                <RadioGroup>
                  <RadioLabel>
                    <input type="radio" value="agree" {...register('terms2')} checked={termsAgreement[2] === true} onChange={() => handleAgreeChange(true, 2)}/>
                    동의
                  </RadioLabel>
                  <RadioLabel>
                    <input
                      type="radio"
                      value="disagree"
                      {...register('terms2')}
                      checked={termsAgreement[2] === false}
                      onChange={() => handleAgreeChange(false, 2)}
                    />
                    비동의
                  </RadioLabel>
                </RadioGroup>
              </AgreementRow>
            </AgreementSection>

            <SubmitButton type="submit">회원가입</SubmitButton>
          </Form>
        </SignUpBox>
      </InnerForm>

      <AgreeModal isOpen={isModalOpen} data={modalData} onClose={handleCloseModal} onAgreeChange={handleAgreeChange} termsAgreement={termsAgreement}/>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 2.5rem;

  @media (max-width: 768px) {
    height: auto;
    padding: 2.5rem;
  }
`;

const InnerForm = styled.div`
  background-color: #f6f6f6;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 480px) {
    width: 60%;
  }
`;

const SignUpBox = styled.div`
  background-color: #f6f6f6;
  width: 100%;
  max-width: 75rem;
  border-radius: 1.25rem;
  padding: 5rem;

  @media (max-width: 768px) {
    padding: 3rem;
  }
  @media (max-width: 480px) {
    padding: 3rem;
    border-radius: 0.625rem;
  }
`;

const Logo = styled.div`
  text-align: center;
  font-size: 3rem;
  font-family: 'Do Hyeon', sans-serif;
  color: rgb(0, 196, 204);
  margin-bottom: 0;
  text-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3.125rem;
  margin-bottom: 3.75rem;
  color: #333;
  border-bottom: 0.25rem solid rgb(53, 196, 243);
  padding-bottom: 1.25rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }
  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex-direction: row;
  flex-wrap: wrap;

  & > label {
    width: 120px;  
  }

  @media (max-width: 768px) {
    & > label {
      width: 10rem;;
    }
  }
`;


const Label = styled.label`
  width: 12.5rem;
  flex-shrink: 0;
  color: #333;
  font-size: 1.875rem;
  margin-top: 0.4rem; // 살짝 정렬용

  @media (max-width: 768px) {
    width: auto;
    font-size: 1.5rem;
    margin-top: 0;
  }
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 1.25rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.625rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1.75rem;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.8rem 1rem;
    
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.6rem 0.8rem;
    
  }
`;

const CheckButton = styled.button`
  padding: 1rem 2rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  white-space: nowrap;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1.3rem;
  }
  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 1.1rem;
  }
`;

const Select = styled.select`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1.75rem;
  background-color: #fff;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.8rem 1rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.6rem 0.8rem;
  }
`;

const DateInputGroup = styled.div`
  display: flex;
  gap: 1.25rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.625rem;
  }
`;

const PhoneInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 0.625rem;
  }
`;

const PhoneInput = styled(Input)`
  width: calc(33.33% - 1.75rem);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Dash = styled.span`
  color: #999;
  @media (max-width: 768px) {
    margin: 0 0.25rem;
  }
`;

const EmailInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.625rem;
    flex-wrap: wrap;
  }
`;

const EmailInput = styled(Input)`
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const EmailSelect = styled.select`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1.75rem;
  background-color: #fff;
  cursor: pointer;
  width: 13%;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.8rem 1rem;
    width: 100%;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.6rem 0.8rem;
  }
`;

const AgreementSection = styled.div`
  margin-top: 2.5rem;
`;

const AgreementTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.875rem;
  color: #333;
  border-bottom: 0.25rem solid rgb(53, 196, 243);
  padding-bottom: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const AgreementRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  position: relative;

  @media (max-width: 768px) {
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const AgreementText = styled.span`
  font-size: 1.75rem;
  color: #333;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const DropdownIcon = styled.span`
  margin-left: 1rem;
  border: solid black;
  border-width: 0 0.25rem 0.25rem 0;
  display: inline-block;
  padding: 0.375rem;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);

  @media (max-width: 768px) {
    margin-left: 0.5rem;
  }
`;

const ErrorTextInline = styled.span`
  margin-left: 1rem;
  color: red;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    margin-left: 0.5rem;
    font-size: 1.2rem;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center; /* 수직 정렬 추가 */
  gap: 0.625rem;
  font-size: 1.75rem;
  color: #333;

  input[type="radio"] {
    appearance: none;
    width: 2rem;
    height: 2rem;
    border: 1px solid black;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    margin: 0;
    vertical-align: middle; /* 체크박스와 텍스트 수직 정렬 */
    &:checked {
      background-color: #00c2ff;
    }

    @media (max-width: 768px) {
      width: 1.6rem;
      height: 1.6rem;
    }
    @media (max-width: 480px) {
      width: 1.4rem;
      height: 1.4rem;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    gap: 0.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 1.5rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    text-align: left;
  }
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  background-color: #01bcd4;
  color: white;
  border: none;
  border-radius: 1.25rem;
  font-size: 2rem;
  cursor: pointer;
  margin-top: 2.5rem;

  &:hover {
    background-color: #00b0e6;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 1.8rem;
    margin-top: 2rem;
  }
  @media (max-width: 480px) {
    padding: 1rem;
    font-size: 1.4rem;
    margin-top: 1.5rem;
  }
`;
