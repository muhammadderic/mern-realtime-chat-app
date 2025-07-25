import type { Gender } from "../types/types";

type GenderCheckboxProps = {
  selectedGender: Gender;
  onCheckboxChange: (gender: Gender) => void;
}

const GenderCheckbox = ({ onCheckboxChange, selectedGender }: GenderCheckboxProps) => {
  return (
    <div className='flex my-2 gap-4'>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
          <span className='label-text'>Male</span>
          <input
            type='checkbox'
            className='checkbox border-slate-900'
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>

      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`}>
          <span className='label-text'>Female</span>
          <input
            type='checkbox'
            className='checkbox border-slate-900'
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
