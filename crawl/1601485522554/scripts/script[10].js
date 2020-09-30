
	{for num:record in mainGenreList}
	<li>
		<div class="genreRecomImg2">
			<a onclick="nclk_v2(event,'rcn*{=nCkicksValue}.thum','{=record.titleId}','{=num + 1}')" href="/webtoon/list.nhn?titleId={=record.titleId}">
				<span class="mask"></span>
				{if record.ageRate == 'RATE_18'}
					<span class="mark_adult_thumb">18세 이상 이용 가능</span>
				{/if}
				<img onerror="this.src='https://ssl.pstatic.net/static/comic/images/migration/common/blank.gif'"
					 src="https://shared-comic.pstatic.net/thumb/webtoon{=record.thumbnailFilepath}{=record.thumbnailFilename}"
					 width="218" height="120" title="{=record.titleName}" alt="{=record.titleName}">
				{if record.finished == 'Y'}<span class="finish">완결</span>{/if}
			</a>
		</div>
		<div class="genreRecomInfo2">
			<h6 class="title">
				{if record.restYN == 'Y'}<span class="ico_break">휴재</span>{/if}
				{if record.webtoonViewerType == 'SMARTTOON'}<span class="ico_smart">스마트툰</span>{/if}
				{if record.webtoonViewerType == 'CUTTOON'}<span class="ico_cut">컷툰</span>{/if}
				{if record.webtoonViewerType == 'SHORTANI'}<span class="ico_short_ani">숏애니</span>{/if}
				<a onclick="nclk_v2(event,'rcn*{=nCkicksValue}.title','{=record.titleId}','{=num + 1}')" href="/webtoon/list.nhn?titleId={=record.titleId}">
					<span>{=record.titleName}</span>
				</a>
			</h6>
			<p>
				<a onclick="nclk_v2(event,'rcn*{=nCkicksValue}.sub','{=record.titleId}','{=num + 1}')" href="/webtoon/detail.nhn?titleId={=record.titleId}&no={=record.no}">
					<span>{=record.subTitle}</span>
				</a>
			</p>
			<span class="user">
			<a href="#" onclick="return goArtist('{=record.titleId}', '{=num + 1}', this, event);">
			{if record.painter == record.writer}
				{=record.painterBy28}
			{/if}
			{if record.painter != record.writer}
				{=record.painterIdBy28}
			{/if}
			</a>
		</span>
		</div>
	</li>
	{/for}
