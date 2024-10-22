import exclamatory from '../../assets/Images/exclamatory.svg';

const InfoHeader = ({ title }: any) => {
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontWeight: '500' }}>
      <div>{title}</div>
      <img src={exclamatory} width="15px" height="15px" alt="" />
    </div>
  );
};

export default InfoHeader;
