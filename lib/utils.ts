export const server =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://fally-improved.vercel.app/'

export const getCurrentWeekInTheYear = () => {
    let d = new Date()
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))

    //@typescript-eslint/no-inferrable-types
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7)
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo]
    // return weekNo
}
