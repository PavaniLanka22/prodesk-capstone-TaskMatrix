function StatsCard({
    icon,
    title,
    value,
    trend,
    trendColor = "green"
}) {

    return (

        <div className="stats-card">

            <div className="stats-icon">
                {icon}
            </div>

            <div className="stats-content">

                <h4>{title}</h4>

                <h2>{value}</h2>

                <p className={`trend ${trendColor}`}>
                    {trend}
                </p>

            </div>

        </div>

    );

}

export default StatsCard;