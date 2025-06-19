interface Props {
  id: string;
}

const CheckboxBtn = ({ id }: Props) => {
  return (
    <>
      <input id={id} type="checkbox" className="peer hidden" />
      <div
        className="w-5 h-5 border-2 border-gray-600 text-gray-600
            flex items-center justify-center rounded
            peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 cursor-pointer"
      >
        ✔
      </div>
    </>
  );
};

export default CheckboxBtn;
