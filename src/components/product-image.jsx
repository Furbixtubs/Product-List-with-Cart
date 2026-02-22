export default function ProductImage(props) {
  return (
    <>
      <img src={props.imageSrc} alt={props.imageAlt} />
    </>
  );
}
