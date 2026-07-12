type Props = {
  name: string;
};

export function useMessage({ name }: Props) {
  function show(message: string) {
    console.log(name, message);
  }

  return {
    show,
  };
}
