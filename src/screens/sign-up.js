import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import {
  Form,
  FormBody,
  FormButton,
  FormDivider,
  FormErrorText,
  FormHeader,
  FormLink,
  FormPrimaryText,
  FormSecondaryText,
} from 'components/form';
import { useAuth } from 'context/auth-context';
import { signUpSchema } from 'data/constraints';
import { useForm } from 'react-hook-form';
import { useAsync } from 'utils/hooks';
import { AuthProviderList } from 'components/auth-providers-list';
import { useTranslation } from 'translations';

function SignUpScreen() {
  const t = useTranslation();

  const { signUp, signInWithAuthProvider } = useAuth();
  const { isLoading, isError: isAuthError, error: authError, run } = useAsync();

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = ({ email, password }) => {
    run(signUp({ email, password }));
    reset();
  };

  const handleAuthProviderClick = (event, provider) => {
    // Prevents the form from submitting and triggering the form errors
    event.preventDefault();

    run(signInWithAuthProvider(provider));
  };

  const errorMessages = Object.values(errors);
  const isError = isAuthError || errorMessages.length !== 0;
  const errorMessage = authError?.message || errorMessages[0]?.message;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>{t('signUp')}</FormPrimaryText>
        <FormSecondaryText>
          {t('hasAccountQuestion')} <FormLink to="/signin">{t('signIn')}</FormLink>
        </FormSecondaryText>
        <FormErrorText>{isError ? errorMessage : ' '}</FormErrorText>
      </FormHeader>

      <FormBody>
        <AuthProviderList
          text={t('signUpWith')}
          onAuthProviderClick={handleAuthProviderClick}
          disabled={isLoading}
        />

        <FormDivider />

        <TextField
          inputRef={register}
          name="email"
          autoComplete="email"
          label={t('email')}
          placeholder="john@doe.com"
          error={!!errors?.email}
          disabled={isLoading}
          variant="outlined"
          fullWidth
        />

        <TextField
          inputRef={register}
          name="password"
          type="password"
          autoComplete="current-password"
          label={t('password')}
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          error={!!errors?.password}
          disabled={isLoading}
          variant="outlined"
          fullWidth
        />
        <TextField
          inputRef={register}
          name="passwordConfirmation"
          type="password"
          autoComplete="password"
          label={t('passwordConfirmation')}
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          error={!!errors?.passwordConfirmation}
          disabled={isLoading}
          variant="outlined"
          fullWidth
        />

        <FormButton type="submit" pending={isLoading}>
          {t('signUp')}
        </FormButton>
      </FormBody>
    </Form>
  );
}

export { SignUpScreen };
