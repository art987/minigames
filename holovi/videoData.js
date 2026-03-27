const videoData = [
    {
        id: 1,
        title: "可爱小狗",
        category: "animal",
        duration: "",
        thumbnail: "",
        src: "https://v11-default.365yg.com/54bcd450110e129eb7bb7c7a23924783/69c67422/video/tos/cn/tos-cn-ve-15c000-ce/oMi7sOSAXeZMe15lMJA856XOW4BDgg8aQfBmjn/?a=0&ch=0&cr=0&dr=0&lr=unwatermarked&net=5&cd=0%7C0%7C0%7C0&cv=1&br=491&bt=491&cs=0&ds=3&ft=aT_7TQQqUnXfmoZmo0OW_QYaUqiX_SwckVJEDOIv3bPD-Ipz&mime_type=video_mp4&qs=0&rc=aGRoOWgzZjVmOjtpN2lnZEBpajpqc3U5cjllODMzbGkzNUBhMi0vLjMwNS4xYzU0YTYzYSM0YzA1MmRrb25hLS1kLTRzcw%3D%3D&btag=80000e00030000&cquery=106H&dy_q=1774609687&feature_id=fea919893f650a8c49286568590446ef&l=202603271908072329DB01E86B6C49BEDA"
    },
    {
        id: 2,
        title: "美丽蝴蝶",
        category: "animal",
        duration: "",
        thumbnail: "",
        src: "https://v11-default.365yg.com/620fdee1efe67d033b01589980470e96/69c673b8/video/tos/cn/tos-cn-ve-15c001-alinc2/ea19bb2a217945a798cc37152178f950/?a=0&ch=0&cr=0&dr=0&lr=unwatermarked&net=5&cd=0%7C0%7C0%7C0&cv=1&br=1233&bt=1233&cs=0&ds=4&ft=aT_7TQQqUnXfmoZmo0OW_QYaUqiXJPwckVJEDOIv3bPD-Ipz&mime_type=video_mp4&qs=0&rc=OGQ0PDc6M2lnNjs0Ojk1OUBpamxpazY6ZnI2ZzMzNGkzM0AyYGExYTItNS8xNV4vMWE2YSMvYmE2cjRfaGVgLS1kLWFzcw%3D%3D&btag=80000e00008000&cquery=106H&dy_q=1774609820&l=202603271910200A77CDC1C8EA87483EE9"
    },
    {
        id: 3,
        title: "孔雀鱼",
        category: "animal",
        duration: "",
        thumbnail: "",
        src: "https://v5-default.365yg.com/e23fcb28f8b75d769cfd26fdb37bd604/69c67559/video/tos/cn/tos-cn-ve-15c001-alinc2/oIfoGa9IAoDAtDfEHjFY5QCVAygZIgBzcSgCAA/?a=0&ch=0&cr=0&dr=0&lr=unwatermarked&net=5&cd=0%7C0%7C0%7C0&cv=1&br=357&bt=357&cs=0&ds=1&ft=aT_7TQQqUnXfmoZmo0OW_QYaUqiXH4wckVJEDOIv3bPD-Ipz&mime_type=video_mp4&qs=0&rc=NTNoaWRkODs3Njk8ZjQzZUBpajx0NnM5cmh2MzMzNGkzM0BeYDI0Yy9jXmExLy1hLzAxYSNgbjNkMmRjYC1hLS1kLS9zcw%3D%3D&btag=80000e00030000&cquery=106H&dy_q=1774609882&feature_id=fea919893f650a8c49286568590446ef&l=202603271911220A7696EFF00E1543D3BC"
    },
    {
        id: 4,
        title: "老虎",
        category: "animal",
        duration: "",
        thumbnail: "",
        src: "https://v11-default.365yg.com/65b688e71c74a835208e738d4c6db65b/69c67456/video/tos/cn/tos-cn-ve-15-alinc2/f7ae46eb547f4f79b898799279602d2f/?a=0&ch=0&cr=0&dr=0&lr=unwatermarked&net=5&cd=0%7C0%7C0%7C0&cv=1&br=871&bt=871&cs=0&ds=4&ft=aT_7TQQqUnXfmoZmo0OW_QYaUqiXZKwckVJEDOIv3bPD-Ipz&mime_type=video_mp4&qs=0&rc=O2k4ZjloNjw6ZjwzaTc2OEBpanA8ZTs6Zmg7OjMzNGkzM0A2MWFiNDFjXzIxMjUvNTIxYSNxbWI0cjRfMGVgLS1kLS9zcw%3D%3D&btag=80000e00008000&cquery=106H&dy_q=1774609979&l=20260327191259F024EBE8E77EE14E5535"
    },
    {
        id: 5,
        title: "海底世界",
        category: "animal",
        duration: "",
        thumbnail: "",
        src: "https://v3-default.365yg.com/e8b0336197cb9a94835107314e8ca2e7/69c674ef/video/tos/cn/tos-cn-ve-15/oc0l9mDlI2fDAUZcAAEmwBublEugHeInQRDB0z/?a=0&ch=0&cr=0&dr=0&lr=unwatermarked&net=5&cd=0%7C0%7C0%7C0&cv=1&br=334&bt=334&cs=0&ds=3&ft=k7Fz7VVywIiRZm8Zmo~pK7pswApoWQY_vrKlISd2do0g3cI&mime_type=video_mp4&qs=1&rc=NTZnMzhnOjQ2ODs2Zmg8ZEBpM2praTM6ZjxtcjMzNGkzM0BeLS5jYWFhX18xYWBfYzRhYSNuMGxtcjRfa2VgLS1kLTBzcw%3D%3D&btag=80000e00028000&cquery=106H&dy_q=1774610055&feature_id=46a7bb47b4fd1280f3d3825bf2b29388&l=202603271914151C37160DFD43024B1508"
    },
    {
        id: 6,
        title: "鲸鱼",
        category: "animal",
        duration: "",
        thumbnail: "",
        src: "https://v11-default.365yg.com/438bb019ec49c140b96bd2dd84b81256/69c67877/video/tos/cn/tos-cn-ve-15c000-ce/oYiuEnufKlXIl8A9frvpjRiwo7SBwWwEAr478B/?a=0&ch=0&cr=0&dr=0&lr=unwatermarked&net=5&cd=0%7C0%7C0%7C0&cv=1&br=1067&bt=1067&cs=0&ds=3&ft=aT_7TQQqUnXfmoZmo0OW_QYaUqiX5EwckVJEDOIv3bPD-Ipz&mime_type=video_mp4&qs=0&rc=Ojg7PDg8aTM5OWY8Omg5O0BpM3FwdnI5cmlkOTMzbGkzNUAuM2AyMF8uNjAxNDEwMzU2YSNoajFlMmRzbHJhLS1kLTRzcw%3D%3D&btag=80000e00038000&cquery=106H&dy_q=1774610196&feature_id=f5241e7604dff1d9d6c943fd20bd51a2&l=20260327191636221141EDD0E4B941FBAD"
    },
    {
        id: 7,
        title: "龙",
        category: "animal",
        duration: "",
        thumbnail: "",
        src: "https://v5-default.365yg.com/25e91a1d28dda8ed8baf723952bd9d29/69c675cf/video/tos/cn/tos-cn-ve-15c001-alinc2/oozABqzAfO2r84lbaeM8AB0AACBIUCQNgxvZhh/?a=0&ch=0&cr=0&dr=0&lr=unwatermarked&net=5&cd=0%7C0%7C0%7C0&cv=1&br=2165&bt=2165&cs=0&ds=3&ft=aT_7TQQqUnXfmoZmo0OW_QYaUqiXI7wckVJEDOIv3bPD-Ipz&mime_type=video_mp4&qs=0&rc=aGk2aGY3OTY1aTk8OzVlOkBpM3A6OTU6Zm94aTMzNGkzM0AvYGBiYTMtNi0xNjNeY2A2YSNyNjUtcjRnLmZgLS1kLS9zcw%3D%3D&btag=80000e00020000&cquery=106H&dy_q=1774610313&feature_id=f0150a16a324336cda5d6dd0b69ed299&l=20260327191832C48C4C523FECEF4ADC2D"
    }
];

const categoryMap = {
    'animal': '动物'
};

const categoryColors = {
    'animal': ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
};