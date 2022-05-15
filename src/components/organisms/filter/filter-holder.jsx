export function FilterHolder({ children, legendName }) {
    return (
        <fieldset className=" bg-secondary border-2 px-4 py-2 m-1">
            <legend className="font-bold">{legendName}</legend>
            <div>{children}</div>
        </fieldset>
    )
}
