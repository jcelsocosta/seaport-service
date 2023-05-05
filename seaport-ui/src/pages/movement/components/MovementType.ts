import { ContainerType } from "@/pages/container/components/ContainerType"

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