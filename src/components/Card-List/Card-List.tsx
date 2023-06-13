import Card from "../Card/Card";

const CardList: React.FC = (props) => {
    return (
        <ul className="wrapper flex flex-wrap gap-2 justify-center p-2">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </ul>
    );
};

export default CardList;
