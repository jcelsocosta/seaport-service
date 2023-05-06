import { ContainerType } from "@/_ui/Container/ContainerType"

type MovementType = {
    id: string
    type: string
    dateInitial: string
    dateFinal: string
    container: ContainerType
}

export type {
    MovementType
}