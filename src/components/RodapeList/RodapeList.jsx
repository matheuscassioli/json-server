const RodapeList = ({ className, data }) => {
 

    return (
        <div className={className}>
            <span><span className="bold">itens:</span> {data.length}</span> 
        </div>
    )
}

export default RodapeList
