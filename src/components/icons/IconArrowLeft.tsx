type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="none" d="M0 0h24v24H0z"/>
  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 8-4 4 4 4m-4-4h20"/>
</svg>

);

export default Icon;
