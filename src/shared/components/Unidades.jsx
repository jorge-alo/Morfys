

export const Unidades = ({cont, setCont}) => {

    const handleSumar = () => {
        setCont(prev => prev + 1)
    }

    const handleRestar = () => {
        if (cont > 1) {
            setCont(prev => prev - 1);
        }
    }
    return (
        <div className='container-unidades'>
            <p>Unidades</p>
            <div>
                <span onClick={handleRestar} >-</span>
                <p> {cont} </p>
                <span onClick={handleSumar}>+</span>
            </div>
        </div>
    )
}
