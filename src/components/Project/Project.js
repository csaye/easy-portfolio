function Project(props) {
  // get project data from props
  const { title, description } = props.data;

  return (
    <div className="Project">
      <hr />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default Project;
