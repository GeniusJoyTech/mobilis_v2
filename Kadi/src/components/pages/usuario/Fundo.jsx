export default function Fundo({ x }) {
    return (
        <div
            style={{
                backgroundImage: "url('https://cdn.pixabay.com/photo/2020/04/18/01/04/cityscape-5057263_640.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {x}
        </div>
    )
}
