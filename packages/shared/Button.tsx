interface IButtonProps {
  text: string;
  onClick: VoidFunction;
}
export function Button({ text, onClick }: IButtonProps) {
  return <button onClick={() => onClick()}>{text}</button>;
}

export default Button;
