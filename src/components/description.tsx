import { useParams } from "react-router"

export const Description = () => {
    const { index } = useParams();
    return (
        <>
            DESCRIPTION OF OBJECT {index}
        </>
    )
}