import React, { useState } from "react";
import Modal from "./modal";
import MapComponent from "./MapComponent"; // Assuming you're using this component for rendering maps
import DirectionsMap from "./DirectionsMap"; // Assuming you're using this for directions

const AdditionalInfoTable = ({
  additionalInfo,
  row,
  mapComponent: MapComponentProp,
  directionsComponent: DirectionsComponentProp,
  tableTitle = "Additional Information",
  children,
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDirectionOpen, setIsDirectionOpen] = useState(false);

  return (
    <tr>
      <td colSpan={6}>
        <div className="p-2 m-2 pb-6 w-3/4 mx-auto rounded-xl bg-secondary">
          <h4 className="font-thin text-center text-2xl my-6">{tableTitle}</h4>
          <table className="w-11/12 mx-auto table-auto border-collapse">
            <tbody>
              {additionalInfo.map((info) => (
                <tr className="border-b" key={info.label}>
                  <td className="p-1">{info.label}</td>
                  <td className="text-end">
                    {info.label === "Exact Location" ? (
                      <>
                        <button
                          className="text-blue-500 mr-4"
                          onClick={() => setIsMapOpen(true)}
                        >
                          {info.value[0]} {/* View Location */}
                        </button>
                        <button
                          className="text-blue-500"
                          onClick={() => setIsDirectionOpen(true)}
                        >
                          {info.value[1]} {/* Get Directions */}
                        </button>
                      </>
                    ) : (
                      info.value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Render additional children if needed */}
          {children}

          {/* Modal for View Location */}
          <Modal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)}>
            <h3 className="text-center mb-4">View Location</h3>
            {MapComponentProp ? (
              <MapComponentProp
                latitude={row.latitude}
                longitude={row.longitude}
              />
            ) : (
              <MapComponent latitude={row.latitude} longitude={row.longitude} />
            )}
          </Modal>

          {/* Modal for Get Directions */}
          <Modal
            isOpen={isDirectionOpen}
            onClose={() => setIsDirectionOpen(false)}
          >
            <h3 className="text-center mb-4">Get Directions</h3>
            {DirectionsComponentProp ? (
              <DirectionsComponentProp
                destination={[row.latitude, row.longitude]}
              />
            ) : (
              <DirectionsMap destination={[row.latitude, row.longitude]} />
            )}
          </Modal>
        </div>
      </td>
    </tr>
  );
};

export default AdditionalInfoTable;
