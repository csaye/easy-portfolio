function Project(props) {
  // get project data from props
  const { title, description } = props.data;

  return (
    <div className="Project">
      <hr />
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default Project;
