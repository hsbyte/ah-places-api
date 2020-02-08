export interface IDestination {
    country: string
    state: string
    iso_code: string
    attributes: [
        {
            favorite: number,
            city: string,
            photo: {
                attribution: string,
                url: string
            }
        }
    ]
    review_id: string
    c_code: string
    favorite: number
}
