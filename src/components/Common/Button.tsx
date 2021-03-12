import styled from 'styled-components';

const Button = styled.button`
  width: 95px;
  color: #198754;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  border-color: transparent;
  border: 1px solid #198754;
  padding: .4rem .75rem;
  border-radius: .25rem;
  transition: all .15s ease-in-out;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #198754;
    color: #fff;
  }
`;

export default Button;
