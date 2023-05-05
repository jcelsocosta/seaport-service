import Head from "next/head";
import { deleteContainer } from "./ContainerController";

interface DeleteContainerProps {
    containerID: string
    numberContainer: string
    handleFlagContainer: () => void
}

export default function DeleteContainer(props: DeleteContainerProps) {
    function handleCloseModal() {
        const target = document.getElementById('deleteContainerModal')
        target?.classList.remove('show')
        target?.setAttribute('style', 'display: none;')
        target?.setAttribute('aria-hidden', 'true')
        target?.removeAttribute('aria-modal')
        target?.removeAttribute('role')

        const targetBackground = document.getElementById('overlay')
        targetBackground?.removeAttribute('style')
    }

    async function handleDeleteContainer() {
        const params = {
            id: props.containerID
        }

        await deleteContainer(params)

        handleCloseModal()

        props.handleFlagContainer()
    }
    return (
        <>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
        </Head>
        <div id="overlay">
        </div>
        <div className="modal fade" tabIndex={-1} id="deleteContainerModal" aria-labelledby="deleteContainerModalLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Remover Contêiner</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseModal()}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mt-2">
                            <p>Confirme a remoção do cotêiner de número: <strong>{props.numberContainer}</strong></p>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-start">
                        <button type="button" className="btn btn-primary" onClick={() => handleDeleteContainer()}>Salvar mudanças</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleCloseModal()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
