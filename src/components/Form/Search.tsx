import { Input } from '@market-duck/components/Form/Input';
import * as FillIcon from '@heroicons/react/24/solid';
import styled from 'styled-components';

const XCircleIcon = styled(FillIcon.XCircleIcon)`
  cursor: pointer;
`;

export const Search = ({
  value,
  changeHandler,
  deleteHandler,
  placeholder,

  isDisabled,
  isError,
}: {
  value: string;
  placeholder?: string;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
  deleteHandler: () => void;
  isDisabled?: boolean;
  isError?: boolean;
  label?: string;
}) => {
  const MagnifyIcon = FillIcon.MagnifyingGlassIcon;

  return (
    <Input
      value={value}
      changeHandler={changeHandler}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isError={isError}
      prefix={<MagnifyIcon />}
      suffix={<XCircleIcon onClick={deleteHandler} />}
    />
  );
};
