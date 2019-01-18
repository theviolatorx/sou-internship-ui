import styled, { css } from 'styled-components';
import InputMask from 'react-input-mask';
import { Field } from 'formik';

const Title = styled.h2`
  display: block;
  font-size: 1.7rem;
  margin: 5vh 0 1rem;
`;

const Subtitle = styled.h3`
  display: block;
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-top: 8vh;
`;

const Row = styled.div`
  width: 90%;
  display: flex;
  ${({ bottom }) =>
    bottom &&
    css`
      margin-bottom: 10vh;
    `}
`;

const Col = styled.div`
  width: ${({ width }) => width || '100%'};
  height: 100%;
  padding: 8px;
`;

const Label = styled.label`
  position: relative;
  vertical-align: center;
  font-size: 1rem;
  color: var(--black-lighten);
  span {
    color: var(--red);
  }
`;

const MyField = styled(Field)`
  width: 100%;
  height: 25px;
  border: 1px solid var(--gray);
  padding: 5px;
  margin-top: 5px;
`;

const MyMask = styled(InputMask)`
  width: 100%;
  height: 25px;
  border: 1px solid var(--gray);
  padding: 5px;
  margin-top: 5px;
`;

const HorizontalDivider = styled.hr`
  width: 90%;
  margin: 5vh 0;
  height: 1px;
  color: rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
`;

const Radio = styled.input`
  display: none;
`;

const Check = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin: 15px 5px 0 0;
  cursor: pointer;
  ${props =>
    props.checked
      ? css`
          background-image: radial-gradient(var(--red) 50%, var(--gray) 50%);
        `
      : css`
          background-color: var(--gray);
        `}
`;

const Link = styled.a`
  color: var(--purple);
  text-decoration: none;
`;

const Error = styled.span`
  display: block;
  color: var(--red);
`;

export {
  Title,
  Subtitle,
  Row,
  Col,
  Label,
  MyField,
  MyMask,
  HorizontalDivider,
  Radio,
  Check,
  Link,
  Error
};
