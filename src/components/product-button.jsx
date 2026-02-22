export default function ProductButton(props) {
  return (
    <>
      <button>
        {props.buttonText}
        <img src={props.imageCart} alt={props.imageCartAlt} />
      </button>
    </>
  );
}
