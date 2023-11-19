const Wrapper = styled.div`
 

`;

const buttonTitle = props.buttonTitle;
const title = props.title || "Title";
const desc = props.desc || "Description";
const idx = props.idx || 0;
const imgURL =
  props.imgURL ||
  "https://raw.githubusercontent.com/gonzalobarria/prodigy-piano-diary/master/public/images/ppd-lila-mini.jpg";
const action = props.action;

return (
  <Wrapper>
    <div class="card w-96 bg-base-100 shadow-xl">
      <img src={imgURL} alt={title} />
      <div class="card-body">
        <h4 class="card-title">{title}</h4>
        <p>{desc}</p>
        {buttonTitle && (
          <div class="justify-end card-actions">
            <button class="btn btn-primary" onClick={action}>
              {buttonTitle}
            </button>
          </div>
        )}
      </div>
    </div>
  </Wrapper>
);
