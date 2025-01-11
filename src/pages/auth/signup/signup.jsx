import React from 'react';
import styled from 'styled-components';
import '@fontsource/do-hyeon';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

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
    phone1: z.string().nonempty('전화번호 앞자리를 입력해주세요.'),
    phone2: z.string().nonempty('전화번호 중간 자리를 입력해주세요.'),
    phone3: z.string().nonempty('전화번호 마지막 자리를 입력해주세요.'),
    emailUser: z.string().nonempty('이메일 아이디를 입력해주세요.'),
    emailDomain: z.string().nonempty('이메일 도메인을 선택해주세요.'),
    customDomain: z.string().optional(),
    terms1: z.enum(['agree', 'disagree'], { invalid_type_error: '* 필수입니다' }),
    terms2: z.enum(['agree', 'disagree'], { invalid_type_error: '* 필수입니다' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })
  .refine((data) => data.terms1 === 'agree', {
    message: '* 필수입니다',
    path: ['terms1'],
  })
  .refine((data) => data.terms2 === 'agree', {
    message: '* 필수입니다',
    path: ['terms2'],
  });

const signUpFn = async (formData) => {
  localStorage.setItem('userId', formData.userId);
  localStorage.setItem('password', formData.password);

  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true };
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const { mutate } = useMutation({
    mutationFn: signUpFn,
    onSuccess: () => {
      console.log('회원가입에 성공하셨습니다. (localStorage에 저장)');
      alert('회원가입에 성공하셨습니다.');
      window.location.href = '/login';
    },
    onError: (err) => {
      console.error(err);
      alert('회원가입에 실패했습니다.');
    },
  });

  const years = Array.from({ length: 120 }, (_, i) => 1900 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const getDaysInMonth = (y, m) => {
    if (!y || !m) return [];
    const yearNum = Number(y);
    const monthNum = Number(m);
    const lastDay = new Date(yearNum, monthNum, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) => i + 1);
  };

  const days = getDaysInMonth(watch('year'), watch('month'));

  const onSubmit = (data) => {
    mutate(data);
  };

  const handleCheckId = () => {
    const userIdValue = watch('userId');
    if (!userIdValue) {
      alert('아이디를 입력해주세요.');
      return;
    }
    // 실제로는 서버 중복확인 API를 호출
    alert('중복확인에 성공하셨습니다.');
  };

  return (
    <Container>
      <InnerForm>
        <SignUpBox>
          <Logo>여행별</Logo>
          <Title>회원가입</Title>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>아이디</Label>
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
            </FormGroup>
            {errors.userId && <ErrorText>{errors.userId.message}</ErrorText>}

            <FormGroup>
              <Label>비밀번호</Label>
              <div style={{ flex: 1 }}>
                <Input
                  type="password"
                  placeholder="비밀번호 입력"
                  {...register('password')}
                />
              </div>
            </FormGroup>
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}

            <FormGroup>
              <Label>비밀번호 확인</Label>
              <Input
                type="password"
                placeholder="비밀번호 재입력"
                {...register('confirmPassword')}
              />
            </FormGroup>
            {errors.confirmPassword && (
              <ErrorText>{errors.confirmPassword.message}</ErrorText>
            )}

            <FormGroup>
              <Label>이름</Label>
              <Input type="text" placeholder="이름 입력" {...register('name')} />
            </FormGroup>
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

            <FormGroup>
              <Label>생년월일</Label>
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
            </FormGroup>
            {(errors.year || errors.month || errors.day) && (
              <ErrorText>
                {errors.year?.message ||
                  errors.month?.message ||
                  errors.day?.message}
              </ErrorText>
            )}

            <FormGroup>
              <Label>전화번호</Label>
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
            </FormGroup>
            {(errors.phone1 || errors.phone2 || errors.phone3) && (
              <ErrorText>
                {errors.phone1?.message ||
                  errors.phone2?.message ||
                  errors.phone3?.message}
              </ErrorText>
            )}

            <FormGroup>
              <Label>이메일</Label>
              <EmailInputGroup>
                <EmailInput
                  type="text"
                  placeholder="이메일 아이디"
                  {...register('emailUser')}
                />
                <EmailAt>@</EmailAt>
                <EmailSelect {...register('emailDomain')}>
                  <option value="">직접입력 또는 선택</option>
                  <option value="custom">직접 입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="daum.net">daum.net</option>
                </EmailSelect>
                {watch('emailDomain') === 'custom' && (
                  <EmailInput
                    type="text"
                    placeholder="직접 입력 도메인"
                    {...register('customDomain')}
                  />
                )}
              </EmailInputGroup>
            </FormGroup>
            {(errors.emailUser || errors.emailDomain) && (
              <ErrorText>
                {errors.emailUser?.message || errors.emailDomain?.message}
              </ErrorText>
            )}

            <AgreementSection>
              <AgreementTitle>약관동의</AgreementTitle>

              <AgreementRow>
                <AgreementText>
                  홈페이지 이용 약관 동의
                  <DropdownIcon />
                  {errors.terms1 && (
                    <ErrorTextInline>{errors.terms1.message}</ErrorTextInline>
                  )}
                </AgreementText>
                <RadioGroup>
                  <RadioLabel>
                    <input type="radio" value="agree" {...register('terms1')} />
                    동의
                  </RadioLabel>
                  <RadioLabel>
                    <input
                      type="radio"
                      value="disagree"
                      {...register('terms1')}
                    />
                    비동의
                  </RadioLabel>
                </RadioGroup>
              </AgreementRow>

              <AgreementRow>
                <AgreementText>
                  개인정보 수집 및 이용
                  <DropdownIcon />
                  {errors.terms2 && (
                    <ErrorTextInline>{errors.terms2.message}</ErrorTextInline>
                  )}
                </AgreementText>
                <RadioGroup>
                  <RadioLabel>
                    <input type="radio" value="agree" {...register('terms2')} />
                    동의
                  </RadioLabel>
                  <RadioLabel>
                    <input
                      type="radio"
                      value="disagree"
                      {...register('terms2')}
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
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const InnerForm = styled.div`
  background-color: #f6f6f6;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const SignUpBox = styled.div`
  background-color: #f6f6f6;
  width: 100%;
  max-width: 600px;

  border-radius: 10px;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Logo = styled.div`
  text-align: center;
  font-size: 24px;
  font-family: 'Do Hyeon', sans-serif;
  color: rgb(0, 196, 204);
  margin-bottom: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 25px;
  margin-bottom: 30px;
  color: #333;
  border-bottom: 2px solid rgb(53, 196, 243);
  padding-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Label = styled.label`
  width: 100px;
  flex-shrink: 0;
  color: #333;
  font-size: 15px;

  @media (max-width: 480px) {
    width: auto;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;

  &::placeholder {
    color: #999;
  }
`;

const CheckButton = styled.button`
  padding: 8px 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;
`;

const Select = styled.select`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fff;
  cursor: pointer;
`;

const DateInputGroup = styled.div`
  display: flex;
  gap: 10px;
  flex: 1;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PhoneInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PhoneInput = styled(Input)`
  width: calc(33.33% - 14px);

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Dash = styled.span`
  color: #999;
`;

const EmailInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const EmailInput = styled(Input)`
  width: 40%;
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const EmailAt = styled.span`
  color: #999;
`;

const EmailSelect = styled.select`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fff;
  cursor: pointer;
`;

const AgreementSection = styled.div`
  margin-top: 20px;
`;

const AgreementTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 15px;
  color: #333;
`;

const AgreementRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AgreementText = styled.span`
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
`;

const DropdownIcon = styled.span`
  margin-left: 8px;
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
`;

const ErrorTextInline = styled.span`
  margin-left: 8px;
  color: red;
  font-size: 12px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;

  input[type='radio'] {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid black;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    margin: 0;

    &:checked {
      background-color: #00c2ff;
    }
  }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #333;

  input {
    margin-right: 5px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #01BCD4;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #00b0e6;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 5px;
`;
