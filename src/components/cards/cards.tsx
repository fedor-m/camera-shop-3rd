import { Camera } from '../../types/camera';
import Card from '../card/card';

type CardsProps = {
  cameras: Camera[] | null;
  openModalWindow: (state: boolean) => void;
};


function Cards({ cameras, openModalWindow }: CardsProps): JSX.Element {
  const cards = cameras && cameras.map(
    (camera) => (
      <Card
        camera={camera}
        key={camera.id}
        openModalWindow={openModalWindow}
      />
    )
  );
  return (
    <div className="cards catalog__cards">
      {cards}
    </div>
  );
}
export default Cards;
