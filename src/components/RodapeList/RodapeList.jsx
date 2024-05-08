const RodapeList = ({ className, data }) => {

    const returnSomeValue = e => {
        let total = Object.values(data).reduce((sum, currentItem) => {
            return sum + Number(currentItem.valor);
        }, 0);
        return total + '$';
    }

    return (
        <div className={className}>
            <span><span className="bold">itens:</span> {data.length}</span>
            <span><span className="bold">soma:</span> {returnSomeValue()}</span>
        </div>
    )
}

export default RodapeList
