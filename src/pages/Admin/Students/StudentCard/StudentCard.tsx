import { calculateAge } from "@/helpers/formatter";
import { IStudent } from "@/services/users/user.interface";

interface StudentCardProps {
    student: IStudent;
}

export default function StudentCard({ student }: StudentCardProps) {

    return (

        <>

            <div className="border-2 border-gray-300 rounded-lg p-6 m-5 mx-10 bg-white grid grid-cols-4">

                <div className="flex col-span-2">

                    <div className="w-22 h-22 border-2 rounded-full border-gray-700 overflow-hidden mr-5">
                        <img src="/dojo.png" alt="dojo.png" />
                    </div>

                    <div className="mr-10 space-y-2">

                        <h3 className="text-2xl">{student.name} {student.lastName}</h3>

                        <div className="flex space-x-10">
                            <div>
                                <p className="text-base">Edad: {calculateAge(student.birthday)}</p>
                                <p className="text-base">Cédula: {student.identification}</p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="flex flex-col items-center justify-center space-y-4">
                    <p>Level: 1er Kyu</p>
                    <p>Attendance: 75%</p>
                </div>

                <div className="flex flex-col justify-between items-end">
                    <p>active</p>
                    <p>Registration date</p>
                </div>

            </div>

        </>

    );

}
