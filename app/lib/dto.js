import 'server-only'
import { getUser } from '@/app/lib/dal'
import User from "@/app/models/userModel";

function canSeeUsername(viewer) {
    return true
}
/*
function canSeePhoneNumber(viewer, team) {
    return viewer.isAdmin || team === viewer.team
}
*/


/*
export async function getProfileDTO(id) {
    const user = await User.findById({_id: id})

    const currentUser = await getUser(user.id)

    return {
        name: canSeeUsername(currentUser) ? user.name : null,
        email: canSeePhoneNumber(currentUser, user.team)
            ? user.phonenumber
            : null,
    }
}*/
